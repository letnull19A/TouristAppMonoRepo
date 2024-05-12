using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TouristCompany.Migrations
{
    /// <inheritdoc />
    public partial class AddedReferenceInTour : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "country_id",
                table: "tours",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_tours_country_id",
                table: "tours",
                column: "country_id");

            migrationBuilder.AddForeignKey(
                name: "FK_tours_countries_country_id",
                table: "tours",
                column: "country_id",
                principalTable: "countries",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tours_countries_country_id",
                table: "tours");

            migrationBuilder.DropIndex(
                name: "IX_tours_country_id",
                table: "tours");

            migrationBuilder.DropColumn(
                name: "country_id",
                table: "tours");
        }
    }
}
