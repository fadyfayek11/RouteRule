using RouteRule.Models;

namespace RouteRule.Bl.ConfigFileOperations;

public interface IConfigRepository
{
    Task<List<configurationSystemwebServerRewriteRule>> MapXmlToRules(string filePath);
    Task<bool> AppendRuleToConfigFile(Rule rule, string filePath);
    Task<bool> RemoveRule(Rule rule, string filePath);
    string ArchivingProcess(string folderPath, string ruleName, string action);
    bool IsFolderExist(string dir);
    bool CopyOldConfigToArchive(string oldDir, string newDir);
    string CreateArchiveTimeStampFolder(string dir, string ruleName, string action);
    bool CreateArchiveFolder(string dir);
    bool IsArchivingDone(string filePath, string ruleName, string action);
    bool DeleteConfig(string dir);
}

