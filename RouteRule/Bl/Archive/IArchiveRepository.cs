namespace RouteRule.Bl.Archive;

public interface IArchiveRepository
{
    List<Models.Archive> GetAllArchives();
    bool RollBack(string archivePath);
}

