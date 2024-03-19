using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StimuliApp.Migrations
{
    /// <inheritdoc />
    public partial class trialsAndrounds : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Trials",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TotalCorrect = table.Column<int>(type: "int", nullable: false),
                    TotalTrials = table.Column<int>(type: "int", nullable: false),
                    CardsOnScreen = table.Column<int>(type: "int", nullable: false),
                    ClientId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Trials", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Trials_Clients_ClientId",
                        column: x => x.ClientId,
                        principalTable: "Clients",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Rounds",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoundNumber = table.Column<int>(type: "int", nullable: false),
                    Target = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Answer = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TrialId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Rounds", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Rounds_Trials_TrialId",
                        column: x => x.TrialId,
                        principalTable: "Trials",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Rounds_TrialId",
                table: "Rounds",
                column: "TrialId");

            migrationBuilder.CreateIndex(
                name: "IX_Trials_ClientId",
                table: "Trials",
                column: "ClientId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Rounds");

            migrationBuilder.DropTable(
                name: "Trials");
        }
    }
}
