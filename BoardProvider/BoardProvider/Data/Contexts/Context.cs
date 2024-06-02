using BoardProvider.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace BoardProvider.Data.Contexts;

public class Context(DbContextOptions<Context> options) : DbContext(options)
{
    public DbSet<BoardEntity> Boards { get; set; }
}
