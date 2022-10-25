using System.Xml;
using RouteRule.Bl.Helpers;
using RouteRule.Models;
using System.Xml.Linq;

namespace RouteRule.Bl.ConfigFileOperations;

public class ConfigRepository : IConfigRepository
{
   
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
        RuleHelperRepository ruleHelper = new(new ConfigRepository());
        await Task.Run((() =>
        {
            var xDocument = XDocument.Load(filePath);
            var root = xDocument?.Element("configuration");
            var rows = root?.Descendants("rules")!;
            var lastRow = rows?.Last();
            lastRow?.Add(XDocument.Parse(ruleHelper.GenerateXmlRule(rule)).FirstNode);
            xDocument?.Save(filePath);
        }));

        return await ruleHelper.IsRuleExist(rule,filePath); // in case append done.
    }
}


