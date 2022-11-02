using System.Xml;
using RouteRule.Bl.Helpers;
using RouteRule.Models;
using System.Xml.Linq;
using Microsoft.Extensions.Options;
using System.Globalization;

namespace RouteRule.Bl.ConfigFileOperations;

public class ConfigRepository : IConfigRepository
{
    private readonly IRuleHelperRepository _ruleHelper;
    private readonly IISApplication _iisApplication;

    public ConfigRepository(IOptions<IISApplication> iisOptions,IRuleHelperRepository ruleHelper)
    {
        _ruleHelper = ruleHelper;
        _iisApplication = iisOptions.Value;
    }

    public async Task<List<configurationSystemwebServerRewriteRule>> MapXmlToRules(string filePath)
    {
        var rules = new List<configurationSystemwebServerRewriteRule>();
        await Task.Run(() =>
        {            
            var ser = new System.Xml.Serialization.XmlSerializer(typeof(configuration));
            try
            {
                using var sr = new StreamReader(filePath);
                var rulesConfiguration = (configuration)ser.Deserialize(sr)!;
                rules = rulesConfiguration.systemwebServer.rewrite.rules.ToList();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        });
        return rules;
    }

    public async Task<bool> AppendRuleToConfigFile(Rule rule, string filePath)
    {
        if (!IsArchivingDone(filePath, rule.Name,"append")) return false;

        await Task.Run(() =>
        {
            try
            {
                var xDocument = XDocument.Load(filePath);
                var root = xDocument.Element("configuration");
                var rows = root?.Descendants("rules")!;
                var lastRow = rows?.Last();
                lastRow?.Add(XDocument.Parse(_ruleHelper.GenerateXmlRule(rule)).FirstNode);
                xDocument.Save(filePath);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        });
        return _ruleHelper.IsRuleExist(rule, await MapXmlToRules(filePath)); // in case append done.
    }

    public async Task<bool> RemoveRule(Rule rule, string filePath)
    {
        if (!_ruleHelper.IsRuleExist(rule, await MapXmlToRules(filePath)))
            return false;

        if (!IsArchivingDone(filePath, rule.Name,"remove")) return false;

        await Task.Run(() =>
        {
            try
            {
                var doc = new XmlDocument();
                doc.Load(filePath);
                var root = doc.ChildNodes[1]?.ChildNodes[0]?.ChildNodes[0]; //trying to access <rules> nodes

                foreach (XmlNode child in root?.ChildNodes[0]!)
                {
                    var pattern = child?["conditions"]?["add"]?.Attributes["pattern"]?.Value;
                    var url = child?["action"]?.Attributes["url"]?.Value.Split('{')[0];
                    var name = child?.Attributes?["name"]?.Value;
                    if (rule.Name == name && rule.Pattern == pattern && rule.Url+'/' == url)
                        root.ChildNodes[0]?.RemoveChild(child!);
                }
                doc.Save(filePath);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        });
        return !_ruleHelper.IsRuleExist(rule, await MapXmlToRules(filePath)); //if rule doesn't exist that means the delete done successfully 
    }

    public bool IsArchivingDone(string filePath, string ruleName, string action)
    {
        var archiveFolder = ArchivingProcess(_iisApplication.FolderPath,ruleName, action);

        if(!string.IsNullOrEmpty(archiveFolder)) 
            return CopyOldConfigToArchive(filePath, archiveFolder);
        
        return false;
    }
     
    public bool CreateArchiveFolder(string dir)
    {
        var directoryInfo = Directory.CreateDirectory(dir);
        return directoryInfo.Exists;
    }
     
    public string CreateArchiveTimeStampFolder(string dir, string ruleName, string action)
    {
        var path = dir + "/" + "#" + DateTime.Now.ToString(CultureInfo.CurrentCulture).Replace('/', '-').Replace(':', '%') + "#" + ruleName + "#" +  action;
        Directory.CreateDirectory(path);
        return path;
    }
     
    public bool CopyOldConfigToArchive(string oldDir, string newDir)
    {
        File.Copy(oldDir, newDir + "/" + Path.GetFileName(oldDir));
        return IsFolderExist(newDir); 
    }
     
    public bool IsFolderExist(string dir)
    {
        return Directory.Exists(dir);
    }
     
    public string ArchivingProcess(string folderPath, string ruleName, string action) 
    {
        var archiveTimeStampFolderPath = "";
        try
        {
            var archiveFolder = folderPath + "/archive";
            if (IsFolderExist(archiveFolder))
                archiveTimeStampFolderPath = CreateArchiveTimeStampFolder(archiveFolder, ruleName, action);
            else
            {
                var isCreated = CreateArchiveFolder(archiveFolder);
                if(isCreated) archiveTimeStampFolderPath = CreateArchiveTimeStampFolder(archiveFolder, ruleName, action);
            }
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
        }
        return archiveTimeStampFolderPath;
    }

    public bool DeleteConfig(string dir)
    {
        File.Delete(dir);
        return !IsFolderExist(dir);
    }
}


