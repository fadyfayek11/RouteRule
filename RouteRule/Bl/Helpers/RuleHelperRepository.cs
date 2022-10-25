using RouteRule.Bl.ConfigFileOperations;
using RouteRule.Models;

namespace RouteRule.Bl.Helpers;

public class RuleHelperRepository : IRuleHelperRepository
{
    private readonly IConfigRepository _configFile;

    public RuleHelperRepository(IConfigRepository configFile)
    {
        _configFile = configFile;
    }

    public RuleHelperRepository()
    {
        
    }
    public async Task<bool> IsRuleExist(Rule rule, string filePath)
    {
        var rules = await _configFile.MapXmlToRules(filePath);
        return rules.Any(x=>
            x.name.Equals(rule.Name) &&
            x.conditions.add.pattern.Equals(rule.Pattern) &&
            x.action.url.Equals(rule.Url));
    }

    public string GenerateXmlRule(Rule rule)
    {
        return $"<rule name=\"{rule.Name}\" stopProcessing=\"true\">\r\n <match url=\"(.*)\" />\r\n" +
               " <conditions logicalGrouping=\"MatchAll\" trackAllCaptures=\"false\">\r\n" +
               $" <add input=\"{{QUERY_STRING}}\" pattern=\"{rule.Pattern}\" />\r\n</conditions>\r\n\t\t\t\t\t" +
               $" <action type=\"Rewrite\" url=\"{rule.Url}/{{R:1}}\" logRewrittenUrl=\"true\" />\r\n</rule>";
    }
}
