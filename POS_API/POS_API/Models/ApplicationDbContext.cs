
using Microsoft.EntityFrameworkCore;

namespace POS_API.Models
{
    public class ApplicationDbContext: DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        // DbSet para la tabla Cliente
        public DbSet<Cliente> Clientes { get; set; }
       
        // para la tabla proveedor
        public DbSet<Proveedor> Proveedores { get; set; }
    }
}
