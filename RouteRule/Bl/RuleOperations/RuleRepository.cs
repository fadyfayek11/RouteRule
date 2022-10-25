using RouteRule.Bl.ConfigFileOperations;
using RouteRule.Bl.Helpers;
using RouteRule.Models;

namespace RouteRule.Bl.RuleOperations;

public class RuleRepository : IRuleRepository
{
    private readonly IConfigRepository _configFile;
    private readonly IConfiguration _configuration;
    private readonly IRuleHelperRepository _ruleHelper;

    public RuleRepository(IConfigRepository configFile,IConfiguration configuration,IRuleHelperRepository ruleHelper)
    {
        _configFile = configFile;
        _configuration = configuration;
        _ruleHelper = ruleHelper;
    }

    public async Task<bool> AddRule(Rule rule)
    {
        if (await _ruleHelper.IsRuleExist(rule, _configuration["ConfigurationFilePath"])) return false;

        return await _configFile.AppendRuleToConfigFile(rule, _configuration["ConfigurationFilePath"]);
    }

    public async Task<bool> RemoveRule(Rule rule)
    {
        throw new NotImplementedException();
    }

    public async Task<bool> UpdateRule(Rule rule)
    {
        throw new NotImplementedException();
    }

    public async Task<IList<Rule>> GetAllRules()
    {
        var res = await _configFile.MapXmlToRules(_configuration["ConfigurationFilePath"]);
        var s = res.Select(x => new Rule()
        {
            Name = x?.name,
            Pattern = x?.conditions?.add?.pattern,
            Url = x?.action.url
        });
        return s.ToList();
    }
}

