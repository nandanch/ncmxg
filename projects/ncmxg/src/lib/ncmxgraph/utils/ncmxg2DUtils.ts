export class Ncmxg2DUtils {
    static getLinePointGivenX(a, b, x1) {
        if (a.x != b.x) {
            let y = ((a.y - b.y) / (a.x - b.x)) * x1 + (((b.y - a.y) * (a.x) + (a.x - b.x) * (a.y)) / ((a.x - b.x)));
            return { "x": x1, "y": y };
        }
    }

    static getLinePointGivenY(a, b, y1) {
        if (a.x == b.x) {
            return { "x": a.x, "y": y1 };
        }

        let x = (y1 - (((b.y - a.y) * (a.x) + (a.x - b.x) * (a.y)) / ((a.x - b.x)))) / ((a.y - b.y) / (a.x - b.x));
        return { "x": x, "y": y1 };
    }

    static lineIntersectionPoint(Point_A, Point_B, Point_C, Point_D) {
        // Line AB represented as a1x + b1y = c1 
        let a1 = Point_B.y - Point_A.y;
        let b1 = Point_A.x - Point_B.x;
        let c1 = a1 * (Point_A.x) + b1 * (Point_A.y);

        // Line CD represented as a2x + b2y = c2 
        let a2 = Point_D.y - Point_C.y;
        let b2 = Point_C.x - Point_D.x;
        let c2 = a2 * (Point_C.x) + b2 * (Point_C.y);

        let determinant = a1 * b2 - a2 * b1;

        if (determinant != 0) {
            let x = (b2 * c1 - b1 * c2) / determinant;
            let y = (a1 * c2 - a2 * c1) / determinant;
            return { "x": x, "y": y };
        }
    }

    static isStraightLinePossible(e1, e2, coordinateMap) {
        /**
         * Test for straight edges
         * starting and ending points 
         */
    
        let returnObj = {
          possible: true,
          intersection: []
        }
    
        //check against all node boundaries
        for (let nd in coordinateMap) {
          let t1 = {}, t2 = {}, b1 = {}, b2 = {}, l1 = {}, l2 = {}, r1 = {}, r2 = {};
          //top line segments
          t1['x'] = coordinateMap[nd].xs,
            t1['y'] = coordinateMap[nd].ys,
            t2['x'] = coordinateMap[nd].xe,
            t2['y'] = coordinateMap[nd].ys,
            //bottom line segments
            b1['x'] = coordinateMap[nd].xs,
            b1['y'] = coordinateMap[nd].ye,
            b2['x'] = coordinateMap[nd].xe,
            b2['y'] = coordinateMap[nd].ye,
            //left line segments
            l1['x'] = coordinateMap[nd].xs,
            l1['y'] = coordinateMap[nd].ys,
            l2['x'] = coordinateMap[nd].xs,
            l2['y'] = coordinateMap[nd].ye,
            //right line segments
            r1['x'] = coordinateMap[nd].xe,
            r1['y'] = coordinateMap[nd].ys,
            r2['x'] = coordinateMap[nd].xe,
            r2['y'] = coordinateMap[nd].ye;
    
          if (this.closed_segment_intersect(e1, e2, t1, t2)) {
            returnObj.possible = false;
            returnObj.intersection.push({ 'vertex': nd, 'points': [t1, t2] });
          } else if (this.closed_segment_intersect(e1, e2, b1, b2)) {
            returnObj.possible = false;
            returnObj.intersection.push({ 'vertex': nd, 'points': [b1, b2] });
          } else if (this.closed_segment_intersect(e1, e2, l1, l2)) {
            returnObj.possible = false;
            returnObj.intersection.push({ 'vertex': nd, 'points': [l1, l2] });
          } else if (this.closed_segment_intersect(e1, e2, r1, r2)) {
            returnObj.possible = false;
            returnObj.intersection.push({ 'vertex': nd, 'points': [r1, r2] });
          }
        }
        return returnObj;
      }

      static side(a, b, c) {
        /** 
         * Returns a position of the point c relative to the line going through a and b
         * Points a, b are expected to be different
        */
        let d = (c.y - a.y) * (b.x - a.x) - (b.y - a.y) * (c.x - a.x)
        return d > 0 ? 1 : (d < 0 ? -1 : 0);
      }

      static is_point_in_closed_segment(a, b, c) {
        /** Returns True if c is inside closed segment, False otherwise.
         * a, b, c are expected to be collinear
        */
        if (a.x < b.x)
          return a.x <= c.x && c.x <= b.x
        if (b.x < a.x)
          return b.x <= c.x && c.x <= a.x
    
        if (a.y < b.y)
          return a.y <= c.y && c.y <= b.y
        if (b.y < a.y)
          return b.y <= c.y && c.y <= a.y
    
        return a.x == c.x && a.y == c.y
      }

      static closed_segment_intersect(a, b, c, d) {
        /** Verifies if closed segments a, b, c, d do intersect.
        */
        if (a == b)
          return a == c || a == d
        if (c == d)
          return c == a || c == b
    
        let s1 = this.side(a, b, c),
          s2 = this.side(a, b, d);
    
        // All points are collinear
        if (s1 == 0 && s2 == 0) {
          return this.is_point_in_closed_segment(a, b, c) ||
            this.is_point_in_closed_segment(a, b, d) ||
            this.is_point_in_closed_segment(c, d, a) ||
            this.is_point_in_closed_segment(c, d, b);
        }
    
        // No touching and on the same side
        if (s1 && s1 == s2)
          return false
    
        s1 = this.side(c, d, a)
        s2 = this.side(c, d, b)
    
        // No touching and on the same side
        if (s1 && s1 == s2)
          return false
    
        return true
      }
}