using Business.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Data.Mappings
{
    public class UsuarioMapping : IEntityTypeConfiguration<Usuario>
    {
        public void Configure(EntityTypeBuilder<Usuario> builder)
        {
            builder.HasKey(x => x.UsuarioId);

            builder.Property(x => x.Nome)
                .IsRequired()
                .HasColumnType("varchar(200)");

            builder.Property(x => x.DataNascimento)
                .IsRequired()
                .HasColumnType("datetime");

            builder.Property(x => x.Email)
                .IsRequired()
                .HasColumnType("varchar(100)");

            builder.Property(x => x.Senha)
                .IsRequired()
                .HasColumnType("varchar(30)");

            builder.Property(x => x.Ativo)
                .IsRequired()
                .HasColumnType("bit");

            builder.HasOne(x => x.Sexo)
                .WithMany(x => x.Usuarios)
                .HasForeignKey(x => x.SexoId);
        }
    }
}