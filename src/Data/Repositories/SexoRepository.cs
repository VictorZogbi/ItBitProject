using Business.Interfaces.Repositories;
using Business.Models;
using Data.Context;

namespace Data.Repositories
{
    public class SexoRepository : Repository<Sexo>, ISexoRepository
    {
        public SexoRepository(ModelDbContext context) : base(context) { }
    }
}
