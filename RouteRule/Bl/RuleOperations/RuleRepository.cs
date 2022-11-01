using Microsoft.Extensions.Options;
using Microsoft.Web.Administration;
using RouteRule.Bl.ConfigFileOperations;
using RouteRule.Bl.Helpers;
using RouteRule.Models;

namespace RouteRule.Bl.RuleOperations;

public class RuleRepository : IRuleRepository
{
    private readonly IConfiguration _configuration;
    private readonly IConfigRepository _configFile;
    private readonly IISApplication _iisApplication;
    private readonly IRuleHelperRepository _ruleHelper;

    public RuleRepository(IConfiguration configuration,IOptions<IISApplication> iisAppOptions, IConfigRepository configFile, IRuleHelperRepository ruleHelper)
    {
        _configuration = configuration;
        _configFile = configFile;
        _ruleHelper = ruleHelper;
        _iisApplication = iisAppOptions.Value;
    }
    
    public async Task<RuleStatus> AddRule(Rule rule)
    {
        if (_ruleHelper.IsRuleExist(rule, await GetAllRules())) return RuleStatus.RuleExist; // in case the same rule exists.

        return await _configFile.AppendRuleToConfigFile(rule, _iisApplication.ConfigurationFilePath)
            ? RuleStatus.AppendDone
            : RuleStatus.Error;
    }

    public async Task<bool> RemoveRule(Rule rule)
    {
        return await _configFile.RemoveRule(rule, _iisApplication.ConfigurationFilePath);
    }

    public async Task<bool> UpdateRule(Rule oldRule, Rule newRule)
    {
        var filePath = _iisApplication.ConfigurationFilePath;
        var deleteStatus = await _configFile.RemoveRule(oldRule, filePath);

        var appendStatus = false;
        if (deleteStatus)
            appendStatus = await _configFile.AppendRuleToConfigFile(newRule, filePath);
        

        return deleteStatus && appendStatus;
    }

    public async Task<IList<Rule>> GetAllRules()
    {
        var res = await _configFile.MapXmlToRules(_iisApplication.ConfigurationFilePath);
        var s = res.Select(x => new Rule()
        {
            Name = x?.name,
            Pattern = x?.conditions?.add?.pattern,
            Url = x?.action.url
        });
        return s.ToList();
    }

    public List<string> GetPatternRegex()
    {
       return _configuration.GetSection("PatternRegex").Get<List<string>>();
    }

    public List<IISApplication> GetIISRouteApps()
    {
        var m = new ServerManager();
        var apps = new List<IISApplication>();
        try
        {
            foreach (var site in m.Sites)
            {
                var state = IsRouteApp(site.Applications[0].VirtualDirectories[0].PhysicalPath, out var fileName);
                if (state)
                {
                    apps.Add(new IISApplication(){Name = site.Name, ConfigurationFilePath = site.Applications[0].VirtualDirectories[0].PhysicalPath +"/"+ fileName,FolderPath = site.Applications[0].VirtualDirectories[0].PhysicalPath });
                }
            }

        }
        catch (Exception e)
        {
            Console.WriteLine(e);
        }

        return apps;
    }
    private static bool IsRouteApp(string folderPath,out string fileName)
    {
        try
        {
            var d = new DirectoryInfo(folderPath);
            var info = d.GetFiles("*", SearchOption.TopDirectoryOnly);
            if (info.Length <= 2 && info[0].Extension == ".config")
            {
                fileName = info[0].Name;
                return true;
            }

        }
        catch (Exception e)
        {
            Console.WriteLine(e);
        }
        fileName = "";
        return false;
    }
}

