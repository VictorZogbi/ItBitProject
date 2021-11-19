using Business.Interfaces.Repositories;
using Business.Interfaces.Services;
using Business.Services;
using Data.Context;
using Data.Repositories;
using Microsoft.Extensions.DependencyInjection;

namespace API.Configuration
{
    public static class DependencyInjectionConfig
    {
        public static IServiceCollection ResolveDependencies(this IServiceCollection services)
        {
            services.AddScoped<ModelDbContext>();
            services.AddScoped<IUsuarioRepository, UsuarioRepository>();
            services.AddScoped<ISexoRepository, SexoRepository>();

            services.AddScoped<ISexoService, SexoService>();
            services.AddScoped<IUsuarioService, UsuarioService>();
            return services;
        }
    }
}