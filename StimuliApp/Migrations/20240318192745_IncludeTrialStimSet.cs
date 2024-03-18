using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StimuliApp.Migrations
{
    /// <inheritdoc />
    public partial class IncludeTrialStimSet : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "SetId",
                table: "Trials",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "StimSetId",
                table: "Trials",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Trials_StimSetId",
                table: "Trials",
                column: "StimSetId");

            migrationBuilder.AddForeignKey(
                name: "FK_Trials_StimSets_StimSetId",
                table: "Trials",
                column: "StimSetId",
                principalTable: "StimSets",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Trials_StimSets_StimSetId",
                table: "Trials");

            migrationBuilder.DropIndex(
                name: "IX_Trials_StimSetId",
                table: "Trials");

            migrationBuilder.DropColumn(
                name: "SetId",
                table: "Trials");

            migrationBuilder.DropColumn(
                name: "StimSetId",
                table: "Trials");
        }
    }
}
