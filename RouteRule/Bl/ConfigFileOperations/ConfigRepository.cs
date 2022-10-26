using System.Xml;
using RouteRule.Bl.Helpers;
using RouteRule.Models;
using System.Xml.Linq;

namespace RouteRule.Bl.ConfigFileOperations;

public class ConfigRepository : IConfigRepository
{
    private readonly IRuleHelperRepository _ruleHelper;

    public ConfigRepository(IRuleHelperRepository ruleHelper)
    {
        _ruleHelper = ruleHelper;
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
}


