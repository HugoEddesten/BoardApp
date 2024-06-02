using System.ComponentModel.DataAnnotations;

namespace BoardProvider.Data.Entities;

public class BoardEntity
{
    [Key]
    public string Id { get; set; } = Guid.NewGuid().ToString();

    public string? Title { get; set; }

    [Required]
    public int StartX { get; set; }

    [Required]
    public int StartY { get; set; }

    [Required]
    public int EndX { get; set; }

    [Required]
    public int EndY { get; set; }

    public string? Color { get; set; }

    public List<TextEntity> TextBoxes { get; set; } = [];

}
