﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StimuliApp.Migrations
{
    /// <inheritdoc />
    public partial class addsGroup : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Group",
                table: "Stimuli",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Group",
                table: "Stimuli");
        }
    }
}
