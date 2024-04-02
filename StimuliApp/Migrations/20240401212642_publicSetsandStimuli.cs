using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StimuliApp.Migrations
{
    /// <inheritdoc />
    public partial class publicSetsandStimuli : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Viewable",
                table: "Stimuli",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Public",
                table: "StimSets",
                type: "bit",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Viewable",
                table: "Stimuli");

            migrationBuilder.DropColumn(
                name: "Public",
                table: "StimSets");
        }
    }
}
