using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TouristCompany.Migrations
{
    /// <inheritdoc />
    public partial class RenameToOrders : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_table_tours_tour_id",
                table: "table");

            migrationBuilder.DropForeignKey(
                name: "FK_table_users_user_id",
                table: "table");

            migrationBuilder.DropPrimaryKey(
                name: "PK_table",
                table: "table");

            migrationBuilder.RenameTable(
                name: "table",
                newName: "orders");

            migrationBuilder.RenameIndex(
                name: "IX_table_user_id",
                table: "orders",
                newName: "IX_orders_user_id");

            migrationBuilder.RenameIndex(
                name: "IX_table_tour_id",
                table: "orders",
                newName: "IX_orders_tour_id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_orders",
                table: "orders",
                column: "id");

            migrationBuilder.AddForeignKey(
                name: "FK_orders_tours_tour_id",
                table: "orders",
                column: "tour_id",
                principalTable: "tours",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_orders_users_user_id",
                table: "orders",
                column: "user_id",
                principalTable: "users",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_orders_tours_tour_id",
                table: "orders");

            migrationBuilder.DropForeignKey(
                name: "FK_orders_users_user_id",
                table: "orders");

            migrationBuilder.DropPrimaryKey(
                name: "PK_orders",
                table: "orders");

            migrationBuilder.RenameTable(
                name: "orders",
                newName: "table");

            migrationBuilder.RenameIndex(
                name: "IX_orders_user_id",
                table: "table",
                newName: "IX_table_user_id");

            migrationBuilder.RenameIndex(
                name: "IX_orders_tour_id",
                table: "table",
                newName: "IX_table_tour_id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_table",
                table: "table",
                column: "id");

            migrationBuilder.AddForeignKey(
                name: "FK_table_tours_tour_id",
                table: "table",
                column: "tour_id",
                principalTable: "tours",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_table_users_user_id",
                table: "table",
                column: "user_id",
                principalTable: "users",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
