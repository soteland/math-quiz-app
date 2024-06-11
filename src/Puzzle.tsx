// src/Puzzle.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import update from 'immutability-helper';

const imageSrc = 'puzzle.jpg';
const numRows = 4;
const numCols = 4;
const pieceWidth = 100;
const pieceHeight = 100;

interface PieceProps {
  id: number;
  src: string;
  left: number;
  top: number;
  onMove: (id: number, left: number, top: number) => void;
}

const Piece: React.FC<PieceProps> = ({ id, src, left, top, onMove }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'piece',
    item: { id, left, top },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), [id, left, top]);

  const [, drop] = useDrop(() => ({
    accept: 'piece',
    drop: (item: { id: number, left: number, top: number }, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset() as {
        x: number;
        y: number;
      };
      const newLeft = Math.round(item.left + delta.x);
      const newTop = Math.round(item.top + delta.y);
      onMove(item.id, newLeft, newTop);
    },
  }), [onMove]);

  return (
    <img
      ref={(node) => drag(drop(node))}
      src={src}
      alt={`piece-${id}`}
      style={{
        position: 'absolute',
        left,
        top,
        width: pieceWidth,
        height: pieceHeight,
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
      }}
    />
  );
};

interface PuzzleState {
  pieces: { id: number; left: number; top: number; }[];
}

const Puzzle: React.FC = () => {
  const [pieces, setPieces] = useState<PuzzleState['pieces']>([]);

  useEffect(() => {
    const initialPieces = [];
    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols; j++) {
        initialPieces.push({
          id: i * numCols + j,
          left: Math.random() * (500 - pieceWidth),
          top: Math.random() * (500 - pieceHeight),
        });
      }
    }
    setPieces(initialPieces);
  }, []);

  const movePiece = useCallback((id: number, left: number, top: number) => {
    setPieces((prevPieces) =>
      update(prevPieces, {
        [id]: {
          $merge: { left, top },
        },
      })
    );
  }, []);

  const isPuzzleComplete = useCallback(() => {
    return pieces.every((piece) => {
      const row = Math.floor(piece.id / numCols);
      const col = piece.id % numCols;
      const expectedLeft = col * pieceWidth;
      const expectedTop = row * pieceHeight;
      return Math.abs(piece.left - expectedLeft) < 10 && Math.abs(piece.top - expectedTop) < 10;
    });
  }, [pieces]);

  useEffect(() => {
    if (isPuzzleComplete()) {
      console.log('Puzzle complete!');
    }
  }, [isPuzzleComplete]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="puzzle-container" style={{ width: 500, height: 500, position: 'relative' }}>
        {pieces.map((piece) => (
          <Piece
            key={piece.id}
            id={piece.id}
            src={`${imageSrc}?id=${piece.id}`} // You would need to split the image and provide correct source for each piece
            left={piece.left}
            top={piece.top}
            onMove={movePiece}
          />
        ))}
      </div>
    </DndProvider>
  );
};

export default Puzzle;
