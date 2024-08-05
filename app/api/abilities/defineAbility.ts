import { AbilityBuilder, PureAbility } from "@casl/ability";
import { createPrismaAbility, PrismaQuery, Subjects } from "@casl/prisma";
import { Book, Category, Rental, User } from "@prisma/client";

type Actions = "manage" | "create" | "read" | "update" | "delete" | "approve";
type AppAbility = PureAbility<
  [
    Actions,
    Subjects<{ User: User; Book: Book; Category: Category; Rental: Rental }>
  ],
  PrismaQuery
>;

export default function defineAbility(user: User) {
  const { can, cannot, build } = new AbilityBuilder<AppAbility>(createPrismaAbility);

  if (user.role === "ADMIN") {
    can("manage", "all" as any);
  } else if (user.role === "OWNER") {
    can("read", "Book");
    can("create", "Book");
    can("update", "Book", { ownerId: user.id });
    can("delete", "Book", { ownerId: user.id });
    can("read", "Category");
    can("read", "Rental", { book: { ownerId: user.id } });
  } else {
    can("read", "Book", { approved: true, status: "AVAILABLE" });
    can("read", "Category");
    can("create", "Rental");
    can("read", "Rental", { userId: user.id });
  }

  return build();
}
