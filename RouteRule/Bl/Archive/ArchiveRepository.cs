using System.Globalization;
using Microsoft.Extensions.Options;
using RouteRule.Bl.ConfigFileOperations;
using RouteRule.Models;

namespace RouteRule.Bl.Archive;

public class ArchiveRepository : IArchiveRepository
{
    private readonly IConfigRepository _configRepository;
    private readonly IISApplication _iisApplication;
    public ArchiveRepository(IConfigRepository configRepository,IOptions<IISApplication> iisOptions)
    {
        _configRepository = configRepository;
        _iisApplication = iisOptions.Value;
    }
    public List<Models.Archive> GetAllArchives()
    {
        var archive = new List<Models.Archive>();
        try
        {
            var folderEntries = Directory.GetDirectories(_iisApplication.FolderPath + "/archive");
            foreach (var folderPath in folderEntries)
            {
                var info = new DirectoryInfo(folderPath);
                var name = info.Name.Split('#');
                archive.Add(new Models.Archive()
                {
                    Date = info.LastWriteTime.ToString(CultureInfo.CurrentUICulture),
                    RuleName = name[2],
                    Action = name[3],
                    ConfigPath = folderPath+"/web.config"
                });
            }
            return archive;
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
        }
       
        return archive;
    }
    public bool RollBack(string archivePath)
    {
        return _configRepository.IsArchivingDone(_iisApplication.ConfigurationFilePath, "before", "rolleback") &&
               _configRepository.DeleteConfig(_iisApplication.ConfigurationFilePath) &&
               _configRepository.CopyOldConfigToArchive(archivePath, _iisApplication.FolderPath); 
    }
}

