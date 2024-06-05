using System.ComponentModel.DataAnnotations;

namespace BoardProvider.Data.Entities;

public class BoardEntity
{
    [Key]
    public string Id { get; set; } = Guid.NewGuid().ToString();

    public string? Title { get; set; }

    [Required]
    public int Y { get; set; }

    [Required]
    public int X { get; set; }

    [Required]
    public int Width { get; set; }

    [Required]
    public int Height { get; set; }

    public string? Color { get; set; }

    public List<TextEntity> TextBoxes { get; set; } = [];

}
