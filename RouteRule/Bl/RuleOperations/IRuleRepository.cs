using RouteRule.Models;

namespace RouteRule.Bl.RuleOperations;

public interface IRuleRepository
{
    Task<RuleStatus> AddRule(Rule rule);
    Task<bool> RemoveRule(Rule rule);
    Task<bool> UpdateRule(Rule oldRule,Rule newRule);
    Task<IList<Rule>> GetAllRules();
    List<string> GetPatternRegex();
    List<IISApplication> GetIISRouteApps();
}
