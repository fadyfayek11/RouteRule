using RouteRule.Models;

namespace RouteRule.Bl.Helpers;

public interface IRuleHelperRepository
{
    Task<bool> IsRuleExist(Rule rule, string filePath);
    string GenerateXmlRule(Rule rule);
}

