
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace POS_API.Models
{
    //[Table("Cliente")] // Nombre de la tabla en la base de datos
    public class Cliente
    {
        public int Id { get; set; } // Clave primaria
        public string Nombre { get; set; } // Nombre del cliente
        public DateTime FechaNacimiento { get; set; } // Fecha de nacimiento
        public string Genero { get; set; } // Género (puede ser opcional)
        public string Direccion { get; set; } // Dirección del cliente
        public string Telefono { get; set; } // Teléfono del cliente
    }
}
