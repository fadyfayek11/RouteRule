﻿using RouteRule.Bl.ConfigFileOperations;
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

    public async Task<FileStatus> AddRule(Rule rule)
    {
        if (_ruleHelper.IsRuleExist(rule, await GetAllRules())) return FileStatus.FileExist; // in case the same rule exists.

        return await _configFile.AppendRuleToConfigFile(rule, _configuration["ConfigurationFilePath"])
            ? FileStatus.AppendDone
            : FileStatus.Error;
    }

    public async Task<bool> RemoveRule(Rule rule)
    {
        return await _configFile.RemoveRule(rule, _configuration["ConfigurationFilePath"]);
    }

    public async Task<bool> UpdateRule(Rule oldRule, Rule newRule)
    {
        var filePath = _configuration["ConfigurationFilePath"];
        var deleteStatus = await _configFile.RemoveRule(oldRule, filePath);
        var appendStatus = await _configFile.AppendRuleToConfigFile(newRule, filePath);

        return deleteStatus && appendStatus;
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

    public List<string> GetPatternPrefixes()
    {
       return _configuration.GetSection("PatternPrefixes").Get<List<string>>();
    }
}

