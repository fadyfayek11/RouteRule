using RouteRule.Models;

namespace RouteRule.Bl.Helpers;

public class RuleHelperRepository : IRuleHelperRepository
{
    public bool IsRuleExist(Rule rule, List<configurationSystemwebServerRewriteRule> rules)
    {
        return rules.Any(x =>
            x.name == rule.Name &&
            x.conditions.add.pattern == rule.Pattern &&
            x.action.url.Split('{')[0] == rule.Url+'/');
    }

    public string GenerateXmlRule(Rule rule)
    {
        return $"<rule name=\"{rule.Name}\" stopProcessing=\"true\">\r\n <match url=\"(.*)\" />\r\n" +
               " <conditions logicalGrouping=\"MatchAll\" trackAllCaptures=\"false\">\r\n" +
               $" <add input=\"{{QUERY_STRING}}\" pattern=\"{rule.Pattern}\" />\r\n</conditions>\r\n\t\t\t\t\t" +
               $" <action type=\"Rewrite\" url=\"{rule.Url}/{{R:1}}\" logRewrittenUrl=\"true\" />\r\n</rule>";
    }

    public bool IsRuleExist(Rule rule, IList<Rule> rules)
    {
        return rules.Any(x =>
            x.Name == rule.Name &&
            x.Pattern == rule.Pattern &&
            x.Url.Split('{')[0] == rule.Url+'/');
    }
}
