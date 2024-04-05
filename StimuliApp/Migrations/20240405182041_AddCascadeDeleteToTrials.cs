using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StimuliApp.Migrations
{
    /// <inheritdoc />
    public partial class AddCascadeDeleteToTrials : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Trials_Clients_ClientId",
                table: "Trials");

            migrationBuilder.AddForeignKey(
                name: "FK_Trials_Clients_ClientId",
                table: "Trials",
                column: "ClientId",
                principalTable: "Clients",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.DropForeignKey(
                name: "FK_Rounds_Trials_TrialId",
                table: "Rounds");

            migrationBuilder.AddForeignKey(
                name: "FK_Rounds_Trials_TrialId",
                table: "Rounds",
                column: "TrialId",
                principalTable: "Trials",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
