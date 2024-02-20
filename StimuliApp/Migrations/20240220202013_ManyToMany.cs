using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StimuliApp.Migrations
{
    /// <inheritdoc />
    public partial class ManyToMany : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Clients_Users_UserId",
                table: "Clients");

            migrationBuilder.DropForeignKey(
                name: "FK_StimSets_Clients_ClientId",
                table: "StimSets");

            migrationBuilder.DropForeignKey(
                name: "FK_Stimuli_StimSets_SetId",
                table: "Stimuli");

            migrationBuilder.DropIndex(
                name: "IX_Stimuli_SetId",
                table: "Stimuli");

            migrationBuilder.DropIndex(
                name: "IX_StimSets_ClientId",
                table: "StimSets");

            migrationBuilder.DropIndex(
                name: "IX_Clients_UserId",
                table: "Clients");

            migrationBuilder.DropColumn(
                name: "SetId",
                table: "Stimuli");

            migrationBuilder.DropColumn(
                name: "ClientId",
                table: "StimSets");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Clients");

            migrationBuilder.CreateTable(
                name: "ClientStimSet",
                columns: table => new
                {
                    ClientsId = table.Column<int>(type: "int", nullable: false),
                    StimSetsId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClientStimSet", x => new { x.ClientsId, x.StimSetsId });
                    table.ForeignKey(
                        name: "FK_ClientStimSet_Clients_ClientsId",
                        column: x => x.ClientsId,
                        principalTable: "Clients",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ClientStimSet_StimSets_StimSetsId",
                        column: x => x.StimSetsId,
                        principalTable: "StimSets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ClientUser",
                columns: table => new
                {
                    ClientsId = table.Column<int>(type: "int", nullable: false),
                    UsersId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClientUser", x => new { x.ClientsId, x.UsersId });
                    table.ForeignKey(
                        name: "FK_ClientUser_Clients_ClientsId",
                        column: x => x.ClientsId,
                        principalTable: "Clients",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ClientUser_Users_UsersId",
                        column: x => x.UsersId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "StimSetStimuli",
                columns: table => new
                {
                    StimSetsId = table.Column<int>(type: "int", nullable: false),
                    StimuliId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StimSetStimuli", x => new { x.StimSetsId, x.StimuliId });
                    table.ForeignKey(
                        name: "FK_StimSetStimuli_StimSets_StimSetsId",
                        column: x => x.StimSetsId,
                        principalTable: "StimSets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_StimSetStimuli_Stimuli_StimuliId",
                        column: x => x.StimuliId,
                        principalTable: "Stimuli",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ClientStimSet_StimSetsId",
                table: "ClientStimSet",
                column: "StimSetsId");

            migrationBuilder.CreateIndex(
                name: "IX_ClientUser_UsersId",
                table: "ClientUser",
                column: "UsersId");

            migrationBuilder.CreateIndex(
                name: "IX_StimSetStimuli_StimuliId",
                table: "StimSetStimuli",
                column: "StimuliId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ClientStimSet");

            migrationBuilder.DropTable(
                name: "ClientUser");

            migrationBuilder.DropTable(
                name: "StimSetStimuli");

            migrationBuilder.AddColumn<int>(
                name: "SetId",
                table: "Stimuli",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ClientId",
                table: "StimSets",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "Clients",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Stimuli_SetId",
                table: "Stimuli",
                column: "SetId");

            migrationBuilder.CreateIndex(
                name: "IX_StimSets_ClientId",
                table: "StimSets",
                column: "ClientId");

            migrationBuilder.CreateIndex(
                name: "IX_Clients_UserId",
                table: "Clients",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Clients_Users_UserId",
                table: "Clients",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_StimSets_Clients_ClientId",
                table: "StimSets",
                column: "ClientId",
                principalTable: "Clients",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Stimuli_StimSets_SetId",
                table: "Stimuli",
                column: "SetId",
                principalTable: "StimSets",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
