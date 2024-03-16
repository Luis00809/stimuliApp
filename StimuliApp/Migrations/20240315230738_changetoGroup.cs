using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StimuliApp.Migrations
{
    /// <inheritdoc />
    public partial class changetoGroup : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Category",
                table: "Stimuli",
                newName: "Group");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Group",
                table: "Stimuli",
                newName: "Category");
        }
    }
}
