using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BoardProvider.Migrations
{
    /// <inheritdoc />
    public partial class widthheight : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "StartY",
                table: "Boards",
                newName: "Y");

            migrationBuilder.RenameColumn(
                name: "StartX",
                table: "Boards",
                newName: "X");

            migrationBuilder.RenameColumn(
                name: "EndY",
                table: "Boards",
                newName: "Width");

            migrationBuilder.RenameColumn(
                name: "EndX",
                table: "Boards",
                newName: "Height");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Y",
                table: "Boards",
                newName: "StartY");

            migrationBuilder.RenameColumn(
                name: "X",
                table: "Boards",
                newName: "StartX");

            migrationBuilder.RenameColumn(
                name: "Width",
                table: "Boards",
                newName: "EndY");

            migrationBuilder.RenameColumn(
                name: "Height",
                table: "Boards",
                newName: "EndX");
        }
    }
}
