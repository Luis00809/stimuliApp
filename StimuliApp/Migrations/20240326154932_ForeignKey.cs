using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StimuliApp.Migrations
{
    /// <inheritdoc />
    public partial class ForeignKey : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Trials_StimSets_StimSetId",
                table: "Trials");

            migrationBuilder.DropIndex(
                name: "IX_Trials_StimSetId",
                table: "Trials");

            migrationBuilder.DropColumn(
                name: "StimSetId",
                table: "Trials");

            migrationBuilder.AlterColumn<string>(
                name: "Target",
                table: "Rounds",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "Answer",
                table: "Rounds",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.CreateIndex(
                name: "IX_Trials_SetId",
                table: "Trials",
                column: "SetId");

            migrationBuilder.AddForeignKey(
                name: "FK_Trials_StimSets_SetId",
                table: "Trials",
                column: "SetId",
                principalTable: "StimSets",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Trials_StimSets_SetId",
                table: "Trials");

            migrationBuilder.DropIndex(
                name: "IX_Trials_SetId",
                table: "Trials");

            migrationBuilder.AddColumn<int>(
                name: "StimSetId",
                table: "Trials",
                type: "int",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Target",
                table: "Rounds",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Answer",
                table: "Rounds",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

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
    }
}
