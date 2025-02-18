using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace POS_API.Models
{
    //[Table("Proveedor")] // Opcional si el nombre de la tabla es diferente
    public class Proveedor
    {
        [Key]
        public int Id { get; set; } // Clave primaria
        public string Nombre { get; set; } // Nombre del proveedor
        public string Direccion { get; set; } // Dirección del proveedor
    }
}

