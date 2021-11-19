using Business.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Data.Mappings
{
    public class SexoMapping : IEntityTypeConfiguration<Sexo>
    {
        public void Configure(EntityTypeBuilder<Sexo> builder)
        {
            builder.HasKey(x=>x.SexoId);

            builder.Property(x => x.Descricao)
                .IsRequired()
                .HasColumnType("varchar(15)");
        }
    }
}