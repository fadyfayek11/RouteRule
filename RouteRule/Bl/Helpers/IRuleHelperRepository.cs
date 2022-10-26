using RouteRule.Models;

namespace RouteRule.Bl.Helpers;

public interface IRuleHelperRepository
{
    bool IsRuleExist(Rule rule, List<configurationSystemwebServerRewriteRule> rules);
    bool IsRuleExist(Rule rule, IList<Rule> getAllRules);
    string GenerateXmlRule(Rule rule);
}

