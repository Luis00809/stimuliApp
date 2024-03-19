using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StimuliApp.Migrations
{
    /// <inheritdoc />
    public partial class AddsDateTrials : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "Date",
                table: "Trials",
                type: "datetime2",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Date",
                table: "Trials");
        }
    }
}
