define(['src/Cell'],function(Cell){

  describe("Cell", function() {

    var cell;

    beforeEach(function() {
      cell = new Cell({
        size: 25,
        x: 50,
        y: 150
      });
    });

    it("exists", function() {
      console.log(cell);
      expect(cell instanceof Cell).toBeTruthy();
    });

    it("has size", function() {
      expect(cell.size).toBe(25);
    });

    it("has x and y coordinates", function() {
      expect(cell.x).toBeDefined();
      expect(cell.y).toBeDefined();
    });

  });

});
