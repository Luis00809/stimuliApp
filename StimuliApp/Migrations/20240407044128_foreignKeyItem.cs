using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StimuliApp.Migrations
{
    /// <inheritdoc />
    public partial class foreignKeyItem : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ItemId",
                table: "Stimuli",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Stimuli_ItemId",
                table: "Stimuli",
                column: "ItemId");

            migrationBuilder.AddForeignKey(
                name: "FK_Stimuli_Items_ItemId",
                table: "Stimuli",
                column: "ItemId",
                principalTable: "Items",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Stimuli_Items_ItemId",
                table: "Stimuli");

            migrationBuilder.DropIndex(
                name: "IX_Stimuli_ItemId",
                table: "Stimuli");

            migrationBuilder.DropColumn(
                name: "ItemId",
                table: "Stimuli");
        }
    }
}
