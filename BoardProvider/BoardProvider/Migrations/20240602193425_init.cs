using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BoardProvider.Migrations
{
    /// <inheritdoc />
    public partial class init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Boards",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    StartX = table.Column<int>(type: "int", nullable: false),
                    StartY = table.Column<int>(type: "int", nullable: false),
                    EndX = table.Column<int>(type: "int", nullable: false),
                    EndY = table.Column<int>(type: "int", nullable: false),
                    Color = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Boards", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TextEntity",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Text = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BoardEntityId = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TextEntity", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TextEntity_Boards_BoardEntityId",
                        column: x => x.BoardEntityId,
                        principalTable: "Boards",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_TextEntity_BoardEntityId",
                table: "TextEntity",
                column: "BoardEntityId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TextEntity");

            migrationBuilder.DropTable(
                name: "Boards");
        }
    }
}
