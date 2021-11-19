using Business.Interfaces.Repositories;
using Business.Models;
using Data.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Data.Repositories
{
    public class UsuarioRepository : Repository<Usuario>, IUsuarioRepository
    {
        public UsuarioRepository(ModelDbContext context) : base(context) { }

        public Task<List<Usuario>> ObterTodosUsuariosSexo()
        {
            return Db.Usuarios.AsNoTracking().Include(x => x.Sexo).ToListAsync();
        }
    }
}
