using System.Xml;
using RouteRule.Bl.Helpers;
using RouteRule.Models;
using System.Xml.Linq;
using Microsoft.Extensions.Options;

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
        if (!IsArchivingDone(filePath, rule.Name)) return false;

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

        if (!IsArchivingDone(filePath, rule.Name)) return false;

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

    private bool IsArchivingDone(string filePath, string ruleName)
    {
        var archiveFolder = ArchivingProcess(ruleName);

        if(!string.IsNullOrEmpty(archiveFolder)) 
            return CopyOldConfigToArchive(filePath, archiveFolder);
        
        return false;

    }

    private static bool CreateArchiveFolder(string dir)
    {
        var directoryInfo = Directory.CreateDirectory(dir);
        return directoryInfo.Exists;
    }

    private static string CreateArchiveTimeStampFolder(string dir)
    {
        var path = dir + "/" + DateTime.Today.ToShortDateString().Replace('/', '-') + "#" + Guid.NewGuid();
        Directory.CreateDirectory(path);
        return path;
    }

    private static bool CopyOldConfigToArchive(string oldDir, string newDir)
    {
        File.Copy(oldDir, newDir + "/" + Path.GetFileName(oldDir));
        return IsFolderExist(newDir); 
    }

    private static bool IsFolderExist(string dir)
    {
        return Directory.Exists(dir);
    }

    private string ArchivingProcess(string ruleName) 
    {
        var archiveTimeStampFolderPath = "";
        try
        {
            var archiveFolder = _iisApplication.FolderPath + "/archive/" + ruleName;
            if (IsFolderExist(archiveFolder))
                archiveTimeStampFolderPath = CreateArchiveTimeStampFolder(archiveFolder);
            else
            {
                var isCreated = CreateArchiveFolder(archiveFolder);
                if(isCreated) archiveTimeStampFolderPath = CreateArchiveTimeStampFolder(archiveFolder);
            }
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
        }
        return archiveTimeStampFolderPath;
    }
}


