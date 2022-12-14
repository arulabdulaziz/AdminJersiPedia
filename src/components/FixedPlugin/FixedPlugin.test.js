import TestRenderer from "react-test-renderer";
import FixedPlugin from "./FixedPlugin";

describe("FixedPlugin", () => {
  describe("Using react-test-renderer", () => {
    it("using props 1", () => {
      const props = {
        bgColor: "white",
        handleBgClick: jest.fn(),
        activeColor: "primary",
        handleActiveClick: jest.fn(),
      };
      const tree = TestRenderer.create(<FixedPlugin {...props} />).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it("using props 2", () => {
        const props = {
          bgColor: "black",
          handleBgClick: jest.fn(),
          activeColor: "secondary",
          handleActiveClick: jest.fn(),
        };
        const tree = TestRenderer.create(<FixedPlugin {...props} />).toJSON();
        expect(tree).toMatchSnapshot();
      });
  });
});
