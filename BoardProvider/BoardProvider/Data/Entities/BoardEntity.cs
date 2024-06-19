using System.ComponentModel.DataAnnotations;

namespace BoardProvider.Data.Entities;

public class BoardEntity
{
    [Key]
    public string Id { get; set; } = Guid.NewGuid().ToString();

    public string? Title { get; set; }

    [Required]
    public decimal Y { get; set; }

    [Required]
    public decimal X { get; set; }

    [Required]
    public decimal Width { get; set; }

    [Required]
    public decimal Height { get; set; }

    public string? Color { get; set; }

    public List<TextEntity> TextBoxes { get; set; } = [];

}
