using System.Net;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using RouteRule.Bl.Helpers;
using RouteRule.Bl.RuleOperations;
using RouteRule.Models;

namespace RouteRule.Controllers
{
    [ApiController]
    [Route("Api/[controller]")]
    public class RulesController : ControllerBase
    {
        private readonly IRuleHelperRepository _helperRepository;
        private readonly IRuleRepository _ruleRepository;
        private readonly IISApplication _iisApplication;

        public RulesController(IOptions<IISApplication> iisApplicationOptions,IRuleHelperRepository helperRepository,IRuleRepository ruleRepository)
        {
            _helperRepository = helperRepository;
            _ruleRepository = ruleRepository;
            _iisApplication = iisApplicationOptions.Value;
        }
        
        [HttpGet(Name = "GetAllRules")]
        [ProducesResponseType(typeof(IList<Rule>),(int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(Enumerable),(int)HttpStatusCode.NoContent)]
        public async Task<IList<Rule>> Get()
        {
            return await _ruleRepository.GetAllRules();
        }
        
        [HttpPost(Name = "AddRule")]
        [ProducesResponseType(typeof(Response),(int)HttpStatusCode.OK)]
        public async Task<IActionResult> Add([FromBody] Rule rule)
        {
            var addingStatus = await _ruleRepository.AddRule(rule);
            if (addingStatus == RuleStatus.AppendDone)
            {
                return new OkObjectResult(new Response(Status.Success,"Adding new rule done successfully"));
            }
            return new OkObjectResult(new Response(Status.Error, addingStatus == RuleStatus.Error ? "Error while adding new rule" : "The same rule is already exist"));
        }
        
        [HttpDelete(Name = "DeleteRule")]
        [ProducesResponseType(typeof(Response),(int)HttpStatusCode.OK)]
        public async Task<IActionResult> Delete([FromBody] Rule rule)
        {
            var removingStatus = await _ruleRepository.RemoveRule(rule);
            if (removingStatus)
            {
                return new OkObjectResult(new Response(Status.Success,"Removing rule done successfully"));
            }
            return new OkObjectResult(new Response(Status.Error, "Can't remove the rule"));
        }

        [HttpPut(Name = "UpdateRule")]
        [ProducesResponseType(typeof(Response),(int)HttpStatusCode.OK)]
        public async Task<IActionResult> Update([FromQuery]Rule oldRule, Rule newRule)
        {
            var updateStatus = await _ruleRepository.UpdateRule(oldRule,newRule);
            if (updateStatus)
            {
                return new OkObjectResult(new Response(Status.Success,"Update rule done successfully"));
            }
            return new OkObjectResult(new Response(Status.Error, "Can't update the rule"));
        }

        [HttpGet]
        [Route("Regex")]
        [ProducesResponseType(typeof(List<string>), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(Enumerable), (int)HttpStatusCode.NoContent)]
        public List<string> GetRegex()
        {
            return _ruleRepository.GetPatternRegex();
        } 

        [HttpGet]
        [Route("RouteApps")]
        [ProducesResponseType(typeof(List<IISApplication>), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(Enumerable), (int)HttpStatusCode.NoContent)]
        public List<IISApplication> GetRouteApp()
        {
            return _ruleRepository.GetIISRouteApps();
        }

        [HttpPost]
        [Route("ApplicationPath")]
        [ProducesResponseType(typeof(Response), (int)HttpStatusCode.OK)]
        public IActionResult UpdateApplicationPath(IISApplication iisApplicationModel)
        {
            _iisApplication.ConfigurationFilePath = iisApplicationModel.ConfigurationFilePath;
            _iisApplication.Name = iisApplicationModel.Name;
            _iisApplication.FolderPath = iisApplicationModel.FolderPath;
            return new OkObjectResult(new Response(Status.Success, "Update new file path done"));
        }

        [HttpPost]
        [Route("Login")]
        [ProducesResponseType(typeof(Response), (int)HttpStatusCode.OK)]
        public IActionResult Login(Login login)
        {
            var successLogin = _helperRepository.IsLoggedIn(login);
            return new OkObjectResult(new Response(Status.Success, successLogin ? "Login done successfully":"Error while login"));
        }


    }
}