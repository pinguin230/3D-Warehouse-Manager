import {IItem} from "../store/redusers/item/item.state.ts";
import {IContainer} from "../store/redusers/container/container.state.ts";

interface PlaceItemsInContainerProps {
  itemsList: IItem[];
  container: IContainer;
  unplacedItems: IItem[];
}

const minDistance = 1;

// Updated intersects function for 3D
const intersects = (item: IItem, other: IItem): boolean => {
  return !(
      item.x! >= other.x! + other.width + minDistance ||
      item.x! + item.width + minDistance <= other.x! ||
      item.y! >= other.y! + other.height + minDistance ||
      item.y! + item.height + minDistance <= other.y! ||
      item.z! >= other.z! + other.depth + minDistance ||
      item.z! + item.depth + minDistance <= other.z!
  );
};

// Sorting items by volume (no changes needed)
export const sortItemByVolume = (items: IItem[]) => {
  return [...items].sort((a, b) => b.volume - a.volume);
};

// Check if an item fits within the container boundaries
const isSpaceAvailable = (container: IContainer, item: IItem): boolean => {
  return (
      item.x! + item.width + minDistance <= container.width &&
      item.y! + item.height + minDistance <= container.height &&
      item.z! + item.depth + minDistance <= container.depth
  );
};

// Function to attempt placing an item at a given position
const tryPlaceItem = (
    container: IContainer,
    item: IItem,
    x: number,
    y: number,
    z: number
): boolean => {
  item.x = x;
  item.y = y;
  item.z = z;

  if (
      isSpaceAvailable(container, item) &&
      !container.contents.some((c) => intersects(item, c))
  ) {
    container.contents.push({ ...item, quantity: 1 });
    return true;
  }
  return false;
};

// Generate all possible orientations of the item (6 in total for 3D)
const getItemOrientations = (item: IItem): IItem[] => {

  console.log("getItemOrientations")

  const { width, height, depth } = item;
  return [
    { ...item, width, height, depth },
    { ...item, width, depth, height },
    { ...item, height, width, depth },
    { ...item, height, depth, width },
    { ...item, depth, width, height },
    { ...item, depth, height, width },
  ];
};

export const greedyAlgorithm3D = (
    itemsList: IItem[],
    container: IContainer
): PlaceItemsInContainerProps => {

  console.log("greedyAlgorithm3D")
  const sortedItemsList = sortItemByVolume(itemsList);
  const unplacedItems: IItem[] = [];

  for (const originalItem of sortedItemsList) {
    let remainingQuantity = originalItem.quantity;

    while (remainingQuantity > 0) {
      let placed = false;

      // Generate all orientations for the current item
      const orientations = getItemOrientations(originalItem);

      // Try each orientation
      for (const item of orientations) {
        // Try every position within the container
        for (let x = 0; x <= container.width - item.width; x++) {
          for (let y = 0; y <= container.height - item.height; y++) {
            for (let z = 0; z <= container.depth - item.depth; z++) {
              if (tryPlaceItem(container, { ...item }, x, y, z)) {
                placed = true;
                remainingQuantity--;
                break;
              }
            }
            if (placed) break;
          }
          if (placed) break;
        }
        if (placed) break;
      }

      // If the item couldn't be placed in any orientation
      if (!placed) {
        unplacedItems.push({ ...originalItem, quantity: 1 });
        remainingQuantity--;
      }
    }
  }

  return {
    itemsList: sortedItemsList,
    container,
    unplacedItems,
  };
};
