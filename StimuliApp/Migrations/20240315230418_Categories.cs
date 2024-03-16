using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StimuliApp.Migrations
{
    /// <inheritdoc />
    public partial class Categories : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Stimuli",
                newName: "StimName");

            migrationBuilder.AddColumn<string>(
                name: "Category",
                table: "Stimuli",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Category",
                table: "Stimuli");

            migrationBuilder.RenameColumn(
                name: "StimName",
                table: "Stimuli",
                newName: "Name");
        }
    }
}
