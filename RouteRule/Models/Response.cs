#nullable disable
namespace RouteRule.Models;

public record Response(Status Status, string Message);

public enum Status
{
    Success,
    Warning,
    Error
}
public enum RuleStatus
{
    AppendDone,
    RuleExist,
    Error
}
