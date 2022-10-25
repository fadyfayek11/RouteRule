using RouteRule.Models;

namespace RouteRule.Bl.RuleOperations;

public interface IRuleRepository
{
    Task<bool> AddRule(Rule rule);
    Task<bool> RemoveRule(Rule rule);
    Task<bool> UpdateRule(Rule rule);
    Task<IList<Rule>> GetAllRules();
}
