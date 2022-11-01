using RouteRule.Models;

namespace RouteRule.Bl.ConfigFileOperations;

public interface IConfigRepository
{
    Task<List<configurationSystemwebServerRewriteRule>> MapXmlToRules(string filePath);
    Task<bool> AppendRuleToConfigFile(Rule rule, string filePath);
    Task<bool> RemoveRule(Rule rule, string filePath);
}

