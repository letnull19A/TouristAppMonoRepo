using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TouristCompany.Migrations
{
    /// <inheritdoc />
    public partial class AddedHotelTourTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "tour_hotel",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    tour_id = table.Column<Guid>(type: "uuid", nullable: false),
                    hotel_id = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tour_hotel", x => x.id);
                    table.ForeignKey(
                        name: "FK_tour_hotel_hotels_hotel_id",
                        column: x => x.hotel_id,
                        principalTable: "hotels",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_tour_hotel_tours_tour_id",
                        column: x => x.tour_id,
                        principalTable: "tours",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_tour_hotel_hotel_id",
                table: "tour_hotel",
                column: "hotel_id");

            migrationBuilder.CreateIndex(
                name: "IX_tour_hotel_tour_id",
                table: "tour_hotel",
                column: "tour_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "tour_hotel");
        }
    }
}
