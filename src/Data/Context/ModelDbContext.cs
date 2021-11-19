using Business.Models;
using Microsoft.EntityFrameworkCore;

namespace Data.Context
{
    public class ModelDbContext : DbContext
    {
        public ModelDbContext(DbContextOptions<ModelDbContext> options) : base(options) { }

        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Sexo> Sexos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(ModelDbContext).Assembly);

            base.OnModelCreating(modelBuilder);
        }
    }
}
